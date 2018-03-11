class Parser {
	constructor() {
		this.parsed = {};
		this.section = null;
	}

	accept(line) {
		let match = /^(.+):\s*$/.exec(line);
		if (match) {
			if (this.parsed.hasOwnProperty(match[1])) {
				this.section = this.parsed[match[1]];
			} else {
				this.section = this.parsed[match[1]] = {};
			}
		} else if (match = /^\s+(\S+)\s+(.+)\s*$/.exec(line)) {
			this.section[match[1]] = match[2];
		}
	}

	parse(lines) {
		for (const line of lines) this.parse(line);
		return this.parsed;
	}
}

module.exports = Parser;