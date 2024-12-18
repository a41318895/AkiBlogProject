import { formatTime } from '@/utils/index.js'

describe('Utils:formatTime', () => {
  const d = new Date('2024-07-16 17:54:01') 
  const retrofit = 5 * 1000

  it('ten digits timestamp', () => {
    expect(formatTime((d / 1000).toFixed(0))).toBe('7月16日17時54分')
  })
  it('test now', () => {
    expect(formatTime(+new Date() - 1)).toBe('剛剛')
  })
  it('less two minute', () => {
    expect(formatTime(+new Date() - 60 * 2 * 1000 + retrofit)).toBe('2分鐘前')
  })
  it('less two hour', () => {
    expect(formatTime(+new Date() - 60 * 60 * 2 * 1000 + retrofit)).toBe('2小時前')
  })
  it('less one day', () => {
    expect(formatTime(+new Date() - 60 * 60 * 24 * 1 * 1000)).toBe('1天前')
  })
  it('more than one day', () => {
    expect(formatTime(d)).toBe('7月16日17時54分')
  })
  it('format', () => {
    expect(formatTime(d, '{y}-{m}-{d} {h}:{i}')).toBe('2024-07-16 17:54')
    expect(formatTime(d, '{y}-{m}-{d}')).toBe('2024-07-16')
    expect(formatTime(d, '{y}/{m}/{d} {h}-{i}')).toBe('2024-07-16 17-54')
  })
})
