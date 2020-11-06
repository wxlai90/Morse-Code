class KeyDuration {
    constructor(threshold, setState) {
        this.startTime = null
        this.THRESHOLD = threshold
        this.setState = setState
    }

    startListening() {
        document.addEventListener('keydown', (e) => {
            if (e.code !== 'Space') return

            this._handlePressDown()
        })

        document.addEventListener('keyup', (e) => {
            if (e.code !== 'Space') return

            this._handlePressUp()
        })
    }


    buttonPress() {
        this._handlePressDown()
    }

    buttonRelease() {
        this._handlePressUp()
    }

    _handlePressDown() {
        if (!this.startTime) {
            this.startTime = + new Date()
        }
    }

    _handlePressUp() {
        const timeLapsed = + new Date() - this.startTime
        this.startTime = null
        let duration = timeLapsed > this.THRESHOLD ? 'Long tap' : 'Short tap'
        this.setState(prevState => ([...prevState, timeLapsed < this.THRESHOLD]))
    }
}

export default KeyDuration