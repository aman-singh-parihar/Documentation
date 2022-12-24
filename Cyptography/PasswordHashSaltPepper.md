### Password hash

Hash function applies to any data to calculate its hash which cannot be traversed back to the orignal data.

By Hashing, we can only go forward, not backward.

Same input string always produce the same hash

### Password Salt

Stored Hash = Hash (Pass + Salt)

for eg:
Pass: catsRcool1
salt: P#)!z

Hash( catsRcool1P#)!z )

        |
        v    

Some random hash

## Pepper

Short string or character appended to the end of the password.

Peppers are random and different for each password.

Stored hash = Hash (Pass + pepper)

for eg:
pepper = M
password = catsRcool

Hash( catsRcoolM )

        |
        v
Some random hash


