export default function (picture = '', action) {

  if (action.type == 'addPicture') {
    return action.pictureData
  }
    return picture
}