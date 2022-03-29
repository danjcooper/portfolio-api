# Custom Notion API.

A custom built API that interfaces with my Notion databases.

This API handles the following actions.

- Adding website messages to a database.
- Updating and creating meal plans and shopping lists.

## Shopping Lists.

### Usage.

| Method | Endpoint                               | Notes                                                                      |
| ------ | -------------------------------------- | -------------------------------------------------------------------------- |
| GET    | /mealprep/ingredients/all              | Retrieve all ingredients and their values                                  |
| GET    | /mealprep/ingredients/all/byDepartment | Retrieve all ingredients sorted by their department.                       |
| GET    | /mealprep/ingredients/departments/all  | Retrieve sorted list of departments                                        |
| GET    | /mealprep/ingredients/notInRecipe      | Retrieve all ingredients that would need to be manually added to the list. |

## Website messages.
