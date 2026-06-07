import { extractTextVariables } from './textVariables';

describe('extractTextVariables', () => {
  it('extracts unique JavaScript-style variable names from template text', () => {
    const text = '{{input}} {{ userName }} {{query}} {{input}}';

    expect(extractTextVariables(text)).toEqual(['input', 'userName', 'query']);
  });

  it('ignores invalid variable names', () => {
    const text = '{{1invalid}} {{has-dash}} {{ valid_name }} {{ $valid }} {{_alsoValid}}';

    expect(extractTextVariables(text)).toEqual(['valid_name', '$valid', '_alsoValid']);
  });
});
