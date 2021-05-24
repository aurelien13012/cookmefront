export default function (picture = '', action) {
  console.log('action', action )
  console.log('actionpicture', action.pictureData)
  if (action.type == 'addPicture') {
    return action.pictureData
  }
    return picture
}