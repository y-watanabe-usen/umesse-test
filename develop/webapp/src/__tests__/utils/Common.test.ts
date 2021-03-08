import * as Common from "@/utils/Common";

describe("test_isRecordingById", () => {
  test('success', () => {
    const id = "123456789-r-6rtlrvac";
    expect(Common.isRecordingById(id)).toBe(true);
  });

  test('fail', () => {
    const id = "123456789-t-6rtlrvac";
    expect(Common.isRecordingById(id)).toBe(false);
  });
});

describe("test_isTtsById", () => {
  test('success', () => {
    const id = "123456789-t-6rtlrvac";
    expect(Common.isTtsById(id)).toBe(true);
  });
  test('fail', () => {
    const id = "123456789-r-6rtlrvac";
    expect(Common.isTtsById(id)).toBe(false);
  });
});
