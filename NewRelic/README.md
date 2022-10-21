# Monitory applications by using the golden signals

## The golden signals

A great place to start a monitoring solution is by implementing Google's four golden signals. The golden signals are latency, traffic, errors, and saturation.

Along with the golden signals are two supporting methods:

- The USE Method: utilization, saturation, and errors. This method can analyze the performance of most any system.

- The RED Method: rate, errors, and duration. This method focuses on service monitoring.

### Latency

Latency is the time that it takes to service a request, or the metric that is formally known as response time. It’s important to measure the latency from service to service and the latency that the user is experiencing. It is a key indicator of degradation in the application.

Don't use averages against latency, as they can be misleading. Rather, use histograms for this metric. Establishing percentile thresholds and values provide a better understanding of what the latency is. Values in the 95th or 99th percentile are key to detecting performance issues in a request or a component.

Be sure to monitor the latency of errors, too. One bad long performing transaction can induce latency to the good requests, making for unhappy users.

### Traffic

Traffic is the amount of activity in the application. This value might be different depending on the characteristics of the application. Again, don't use averages. Examples of traffic include the number of requests that an API handled, the number of connections to an application server, and the bandwidth that was consumed to stream an application.

### Errors

Errors are the rate of requests that are failing. Monitoring explicit errors, such as HTTP 500s, is straightforward. You also need to "catch" the HTTP 200s that are sharing the wrong content. Measure errors in rates.

Errors should expose bugs in the application, misconfigurations in the service, and dependency failures. Error rates can also affect other measurements, such as lowering latency or increasing saturation.


# Apdex

[Apdex](https://www.apdex.org/) an industry standard to measure user's satisfaction with the response time of web applications and services.

## Measurements

Apdex is a measure of response time based against a set threshold. It measures the ratio of satisfactory response times to unsatisfactory response times.

After you define a response time threshold T, all responses handled in T or less time satisfy the user.

For example, if T is 1.2 seconds and a response completes in 0.5 seconds, then the user is satisfied. All responses greater than 1.2 seconds dissatisfy the user. Responses greater than 4.8 seconds frustrate the user.

## Apdex Levels

Apdex tracks three response counts:

- Satisfied: The response time is less than or equal to T.
- Tolerating: The response time is greater than T and less than or equal to 4T. In this example, 4 x 1.2 = 4.8 seconds is the maximum tolerable response time.
- Frustrated: The response time is greater than 4T or the request returns a server-side error. A high error rate can cause you to have a satisfying average response time, yet a poor Apdex score.

The time calculation will change based on your own app's T setting. In the following example, T = 1.2 seconds.

| Level      | Multiplier | Time (T Example = 1.2)
| ---------- | ---------- | -------------------- |
| Satisfied  | T or less  | <= 1.2 seconds
| Tolerated  | >T, <= 4T  | Between 1.2 and 4.8 seconds
| Frustrated | > 4T       | Greater than 4.8 seconds

## Apdex score

The Apdex score is a ratio value of the number of satisfied and tolerating requests to the total requests made. Each satisfied request counts as one request, while each tolerating request counts as half a satisfied request.

An Apdex score varies from 0 to 1, with 0 as the worst possible score (100% of response times were Frustrated), and 1 as the best possible score (100% of response times were Satisfied).

### Example Apdex score:

During a 2 minute period a host handles 200 requests. The Apdex threshold T = 0.5 seconds (500ms). This value is arbitrary and is selected by the user.

- 170 of the requests were handled within 500ms, so they are classified as Satisfied.
- 20 of the requests were handled between 500ms and 2 seconds (2000 ms), so they are classified as Tolerating.
- The remaining 10 were not handled properly or took longer than 2 seconds, so they are classified as Frustrated.

The resulting Apdex score is 0.9: ``` (170 + (20/2))/200 = 0.9```.

***

# New Relic data types:metrics,events,logs and traces(MELT)

New Relic platform is built around the four fundamental telementry data types, which are necessary for complete and effective system monitoring: metric, events, logs and traces(MELT).

## Metrics

Definition of metrics from a monitoring industry perpective, and then how New Relic handles metrics.

### Metrics in the monitoring industry

A metric means a numeric measurement of an application or system. Metrics are typically reported on a regular schedule.

#### Two major types of metrics are:

- Aggregated data. For example: a count of events over one minute's time, or the rate of some event per minute.
- A numeric status at a moment in time. For example: a CPU temperature reading, or a "CPU% used" status.

### Metrics at New Relic

There are various ways New Relic measures and reports metrics but, in practice, when using the New Relic UI, you usually won't have to understand how exactly this happens. New Relic just refer to "metrics", regarding of how that data is reported.

Here are some of the ways metrics are reported and stored across the New Relic platform:
