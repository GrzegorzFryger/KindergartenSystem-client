export class HttpTrace {
  traces: HttpTraces[];
}

class HttpTraces {
  timestamp: string;
  request: HttpTraceRequest;
  response: HttpTraceResponse;
  principal: string;
  session: string;
}

class HttpTraceRequest {
  method: string;
  uri: string;
}

class HttpTraceResponse {
  status: number;
  timeTaken: number;
}
