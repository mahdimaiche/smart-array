# Smart-Table

## What does this project consist of?

This project is a responsive Table component that allows for visualizing data in a table like fashion.\
The table was developed mainly to handle numeric values but it can be generalized to other types easily. Each cell can contain either a numeric value, a complete line, or completely another table. There are no limitations on the nesting levels.\
The table rows are also reactive, each row can react to changes of other rows and update accordingly.

The component is written completely in Vue3 with no dependency on other libraries.

## How does the reactiveness work?

The idea is pretty simple, each row is assigned a key, which can be theoritically any string. Also each row must declare its dependencies on other rows.\
The rest is the magic of the Vue reactiveness system, with each row pointing to its dependency, updates on row changes are done automatically.

## NB

The container component is using JSX and due to configuration issues with vitest it wasn't tested, to be fixed later
