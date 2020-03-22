class FetchLog {
	static fetchID(logID) {
		return fetch(`https://logs.tf/json/${logID}`, {cache: 'force-cache'})
			.then(r => r.json())
	}

	static fetchTestLogs(logID) {
		return fetch(`${process.env.PUBLIC_URL}/data/${logID}.json`, {cache: 'force-cache'})
			.then(r => r.json())
	}
}

export default FetchLog
