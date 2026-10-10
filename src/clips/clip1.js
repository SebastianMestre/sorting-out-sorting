
function clip1() {

    const result = new Scene();

    const lineHeight = 110;
    const textSize = 32;

    let lineCount = 0;
    const font = "Times New Roman";
    const color = "white";

    const leftPadding = 48;
    const topPadding = 120;

    const line1 = result.text(leftPadding, topPadding + lineHeight * lineCount++, textSize, font, color, "Dynamic Graphics Project");
    const line2 = result.text(leftPadding, topPadding + lineHeight * lineCount++, textSize, font, color, "Computer Systems Research Group");
    const line3 = result.text(leftPadding, topPadding + lineHeight * lineCount++, textSize, font, color, "University of Toronto");
    
    return result;
}