# Why OOPS?
It helps us to think in terms of the real world objects.
Note: The big idea is "messaging" and "late-binding".
For example: A hospital management system will have Doctors and Patients.

```
class Patient
{
	public string Name {get; set;}
	public Doctor doctor {get; set;}
}

class Doctor
{
	publis string Name {get; set;}
}
```

# Four pillars of OOPS

## Abstraction
The main goal is to handle complexity by hiding unnecessary details from the user.
## Polymorphism
## Inheritance
## Encapsulation

| Abstraction | Encapsulation |
| ----------- | ---------- | 
| Abstraction focuses upon the observable behavior of an object.   | Encapsulation focuses upon the implementation that gives rise to this behavior.
| Using Abstraction, we solve problems at the design level   | Using implementation, we solve problems at the implementation level.
| Abstraction is the method of hiding unwanted information  | Encapsulation is a method to hide the data in a single entity and protect information from outside.    