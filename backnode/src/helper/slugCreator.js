export const slugCreator = async (title, Model) => {
  try {
    var lowerCaseTitle = title.toLowerCase()
    var slug = lowerCaseTitle
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with dashes
      .replace(/^-|-$/g, '') // Remove leading and trailing dashes
      .trim() // Trim any whitespace
    var is_slugExist = await slugExist(slug, Model)
    console.log(is_slugExist)
    if (is_slugExist) {
      slug = slug + Date.now()
      return slug
    }
    if (!is_slugExist) {
      return slug
    }
    return ''
  } catch (err) {
    new Error('Cannot generate slug')
  }
}

export const slugExist = async (slug, Model, id) => {
  try {
    const slugExist = await Model.findOne({ slug }).lean()
    if (id && slugExist) {
      if (id != slugExist._id) {
        console.log('true')
        return true
      } else {
        console.log('false')
        return false
      }
    } else {
      console.log('dle')
      return slugExist ? true : false
    }
  } catch (err) {
    new Error('Cannot check slug')
  }
}