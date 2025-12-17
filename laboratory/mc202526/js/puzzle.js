
class Puzzle {
    constructor(rows, cols, piece_size) {
        this.rows = rows
        this.cols = cols
        this.piece_size = piece_size
        this.pieces = []
        this.selectedPiece = null
        this.offsetX = 0
        this.offsetY = 0
    }

    draw() {

    }
}


class Piece {
    constructor(row, col, size, direction) {
        this.row = row
        this.col = col
        this.size = size
        this.direction = direction
    }

    draw(offset_x, offset_y) {
        const emojiMap = {
            'U': '⬆️',
            'D': '⬇️',
            'L': '⬅️',
            'R': '➡️'
        }
        
        push()
        translate(offset_x + this.col * this.size, offset_y + this.row * this.size)
        
        // Draw the directional arrow emoji
        textSize(this.size * 0.8)
        textAlign(CENTER, CENTER)
        text(emojiMap[this.direction], 0, 0)
        
        pop()
    }
}