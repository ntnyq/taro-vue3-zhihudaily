import type { Question } from '@/types'

/**
 * Get matched String
 * @param matches REGEXP match result
 * @returns matched string
 */
export function getMatchedString (matches: string[] | null) {
  return (matches || [])[0] || ``
}

// ([\s\S]*?) 可以匹配换行等字符，(.*?) 是不可以的
export const RE_QUESTION = /<div class="question">([\s\S]*?)<\/a>(\n*)<\/div>(\n*)<\/div>/g
export const RE_TITLE = /<h2.*?<\/h2>/g
export const RE_ANSWER = /<div class="answer">([\s\S]*?)<\/div>(\n*)<\/div>/g
export const RE_AVATAR = /<img class="avatar"(.*?).((jpe?g)|(png))([\s\S]*?)">/g
export const RE_AUTHOR = /<span class="author">(.*?)<\/span>/g
export const RE_BIO = /<span class="bio">(.*?)<\/span>/g
// TODO 正文，段落列表，需要添加兼容性，p标签是段落正文，figure 标签有可能内嵌图片信息
export const RE_CONTENT = /(<p>|<figure).*?(<\/p>|<\/figure>)/g
export const RE_IMAGE = /<img.*?>/i
export const RE_IMAGE_SOURCE = /src=".*?"/i

export function normalizeStory (html: string) {
  const images: string[] = []
  const questions: Question[] = []
  const questionHtmlList = html.match(RE_QUESTION)
  if (!questionHtmlList || !questionHtmlList.length) return { images, questions }

  questionHtmlList.forEach(question => {
    const titleHtml = getMatchedString(question.match(RE_TITLE))
    const title = titleHtml.substring(27, titleHtml.length - 5) || ``
    const answerHtmlList = question.match(RE_ANSWER) || []
    const answers = answerHtmlList.map(answer => {
      const avatarHtml = getMatchedString(answer.match(RE_AVATAR))
      const authorHtml = getMatchedString(answer.match(RE_AUTHOR))
      const bioHtml = getMatchedString(answer.match(RE_BIO))
      const contentHtmlList = answer.match(RE_CONTENT) || []

      const avatar = avatarHtml.substring(25, avatarHtml.length - 2)
      const author = authorHtml.substring(21, authorHtml.length - 8)
      const bio = bioHtml.substring(18, bioHtml.length - 7)
      const contents = contentHtmlList.map(content => {
        const hasImage = RE_IMAGE.test(content)
        const temp = { type: ``, content: `` }
        if (hasImage) {
          const tempContentHtml = getMatchedString(content.match(RE_IMAGE_SOURCE))
          const imageSrc = tempContentHtml.substring(5, tempContentHtml.length - 1)
          temp.content = imageSrc
          temp.type = `IMAGE`
          images.push(imageSrc)
        } else {
          temp.type = `PARAGRAPH`
          temp.content = content
            // .replace(/<p>/g, '')
            // .replace(/<\/p>/g, '')
            // 不屏蔽 strong 标签
            // .replace(/<strong>/g, '')
            // .replace(/<\/strong>/g, '')
            .replace(/<a.*?\/a>/g, ``)
            .replace(/&nbsp;/g, ` `)
            .replace(/&ldquo;/g, `"`)
            .replace(/&rdquo;/g, `"`)
        }
        return temp
      })

      return { avatar, author, bio, contents }
    })

    questions.push({ title, answers })
  })

  return {
    images,
    questions,
  }
}
