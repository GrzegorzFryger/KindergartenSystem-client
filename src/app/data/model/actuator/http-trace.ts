export class HttpTrace {
  traces: HttpTraces[];
}

class HttpTraces {
  timestamp: string;
  request: HttpTraceRequest;
  response: HttpTraceResponse;
  principal: string;
  session: string;
  timeTaken: number;
}

class HttpTraceRequest {
  method: string;
  uri: string;
}

class HttpTraceResponse {
  status: number;
}
