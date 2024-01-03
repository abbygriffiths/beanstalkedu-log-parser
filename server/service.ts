export function parseText(text: string) {
    const lines = text.split('\n');
    return lines.filter((line: string) => {
        return (line.length !== 0) && (line !== undefined) && (line !== null);
    }).map(parseSingleLine).filter((line) => {
        return (line['loglevel'] === 'error') || (line['loglevel'] === 'warn')
    });
}

function parseSingleLine(line: string) {
    const chunks = line.split(' - ');

    const dateStr = chunks[0];
    const logLevel = chunks[1];
    const jsonStr = chunks[2];

    const parsedObj = JSON.parse(jsonStr);

    let errorString = 'Not Found';
    if ('err' in parsedObj) {
        errorString = parsedObj['err'];
    }

    return {
        'timestamp': Date.parse(dateStr),
        'loglevel': logLevel,
        'transactionId': parsedObj['transactionId'],
        'err': errorString
    }
}
