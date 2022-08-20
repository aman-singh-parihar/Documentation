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