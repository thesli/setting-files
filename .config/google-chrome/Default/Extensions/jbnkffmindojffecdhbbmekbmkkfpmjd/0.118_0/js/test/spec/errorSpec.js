define(["background/model/error"],function(e){"use strict";describe("Error",function(){it("Should truncate a long message properly when initializing",function(){var t=new e({message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at pharetra dolor, non bibendum sapien. Sed tellus lectus, pellentesque eu tincidunt ut, dictum et urna. Proin pretium eget nibh id rutrum. Nam at convallis enim. Sed mi dolor, tempor nec turpis quis, egestas consequat ligula. Ut cursus elementum ligula, vitae ultrices ante feugiat in. Sed aliquam eros lorem. Pellentesque sed venenatis sem."});expect(t.get("message").length).toBeLessThan(256)}),it("Should throw a validation error when saving too long of a message",function(){var t=new e({message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at pharetra dolor, non bibendum sapien. Sed tellus lectus, pellentesque eu tincidunt ut, dictum et urna. Proin pretium eget nibh id rutrum. Nam at convallis enim. Sed mi dolor, tempor nec turpis quis, egestas consequat ligula. Ut cursus elementum ligula, vitae ultrices ante feugiat in. Sed aliquam eros lorem. Pellentesque sed venenatis sem."});t.set("message","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at pharetra dolor, non bibendum sapien. Sed tellus lectus, pellentesque eu tincidunt ut, dictum et urna. Proin pretium eget nibh id rutrum. Nam at convallis enim. Sed mi dolor, tempor nec turpis quis, egestas consequat ligula. Ut cursus elementum ligula, vitae ultrices ante feugiat in. Sed aliquam eros lorem. Pellentesque sed venenatis sem."),t.save(),expect(t.validationError).not.toBeNull(),expect(t.validationError.length).toBeGreaterThan(0),expect(t.isValid()).toBe(!1)})})});