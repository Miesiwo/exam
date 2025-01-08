const { reshape, processSizesWildcard, squeeze, unsqueeze, arraySize } = require( './libs/variant9');

describe('reshape', () => {
  test('should reshape a 1D array into a 2D array', () => {
    const input = [1, 2, 3, 4];
    const sizes = [2, 2];
    const result = reshape(input, sizes);
    expect(result).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  test('should throw DimensionError for mismatched sizes', () => {
    const input = [1, 2, 3, 4];
    const sizes = [3, 2];
    expect(() => reshape(input, sizes)).toThrowError('DimensionError');
  });
});

describe('processSizesWildcard', () => {
  test('should replace wildcard correctly', () => {
    const sizes = [-1, 2];
    const currentLength = 6;
    const result = processSizesWildcard(sizes, currentLength);
    expect(result).toEqual([3, 2]);
  });

  test('should throw error for multiple wildcards', () => {
    const sizes = [-1, -1];
    const currentLength = 6;
    expect(() => processSizesWildcard(sizes, currentLength)).toThrowError('More than one wildcard in sizes');
  });
});

describe('squeeze', () => {
  test('should remove outer dimensions of size 1', () => {
    const input = [[[1, 2, 3]]];
    const result = squeeze(input, arraySize(input));
    expect(result).toEqual([1, 2, 3]);
  });

  test('should not modify arrays without size 1 dimensions', () => {
    const input = [[1, 2, 3]];
    const result = squeeze(input, arraySize(input));
    expect(result).toEqual([[1, 2, 3]]);
  });
});

describe('unsqueeze', () => {
  test('should add dimensions to a 1D array', () => {
    const input = [1, 2, 3];
    const result = unsqueeze(input, 3, 1, arraySize(input));
    expect(result).toEqual([[[1, 2, 3]]]);
  });

  test('should not change dimensions if already sufficient', () => {
    const input = [[1, 2, 3]];
    const result = unsqueeze(input, 2, undefined, arraySize(input));
    expect(result).toEqual([[1, 2, 3]]);
  });
});

//arraySize undefined тому частина тестів не проходить