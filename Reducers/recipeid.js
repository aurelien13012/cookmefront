export default function (recipeId = '', action) {
    console.log('action', action )
    console.log('actionrecipe', action.recipeId)
    if (action.type == 'saveRecipeId') {
        return action.recipeId
    }
    return recipeId
}