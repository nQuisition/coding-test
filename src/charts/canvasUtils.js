export function fillRect(ctx, x, y, w, h, fillColor) {
  if (fillColor) {
    ctx.fillStyle = fillColor;
  }
  ctx.fillRect(x, y, w, h);
}

export function drawRect(ctx, x, y, w, h, strokeColor) {
  if (strokeColor) {
    ctx.strokeStyle = strokeColor;
  }
  ctx.strokeRect(x, y, w, h);
}

export function drawFillRect(ctx, x, y, w, h, fillColor, strokeColor) {
  fillRect(ctx, x, y, w, h, fillColor);
  drawRect(ctx, x, y, w, h, strokeColor);
}

export function drawLine(ctx, x1, y1, x2, y2, color, width = 1) {
  if (color) {
    ctx.strokeStyle = color;
  }
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
