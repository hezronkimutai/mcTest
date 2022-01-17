import { articleStatus, articleBody, articleTitle ,like} from "./index";

export const createArticleRules = () => [
  articleStatus,
  articleBody,
  articleTitle,
];
export const likeArticleRules = ()=>[like]
