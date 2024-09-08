package com.akichou.job;

import com.akichou.domain.entity.Article;
import com.akichou.repository.ArticleRepository;
import com.akichou.util.RedisCache;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.akichou.constant.SystemConstants.ARTICLE_VIEW_COUNT_REDIS_KEY_NAME;

/**
 * Update ViewCount Scheduled Job
 *
 * @author Aki Chou
 * @date 2024/08/20 Tue.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class UpdateViewCountJob {

    private final RedisCache redisCache;
    private final ArticleRepository articleRepository;

    @Scheduled(cron = "0/50 * * * * ?")
    public void updateViewCount() {
        //log.info("定時任務執行完畢 !") ;

        Map<Object, Object> cacheMap = redisCache.getCacheMap(ARTICLE_VIEW_COUNT_REDIS_KEY_NAME);

        List<Article> articles = cacheMap.entrySet().stream()
                .map(entry -> {
                    try {

                        Long articleId = toLong(entry.getKey());
                        Long viewCount = toLong(entry.getValue());
                        Optional<Article> articleOptional = articleRepository.findById(articleId);
                        if (articleOptional.isPresent()) {

                            Article article = articleOptional.get();
                            article.setViewCount(viewCount);
                            return article;
                        } else {

                            log.warn("Article with ID {} not found in database.", articleId);
                            return null;
                        }
                    } catch (NumberFormatException | ClassCastException e) {

                        log.error("Invalid data format in cache: {}", entry, e);
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        if (!articles.isEmpty()) {

            articleRepository.saveAll(articles);
        }
    }

    private Long toLong(Object value) {
        if (value instanceof String) {
            return Long.valueOf((String) value);
        } else if (value instanceof Integer) {
            return ((Integer) value).longValue();
        } else if (value instanceof Long) {
            return (Long) value;
        } else {
            throw new ClassCastException("Cannot cast value to Long: " + value);
        }
    }
}