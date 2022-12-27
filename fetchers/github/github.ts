import axios from 'axios';
import { languages } from '../../constants/languages.constant';
import type { LanguageDictionary } from '../../interfaces/phrase.interface';

interface GithubRepository {
  org: string;
  repo: string;
  baseUrl?: string;
  token?: string;
}

const getAxiosClient = ({ baseUrl, org, repo, token }: GithubRepository) => {
  return axios.create({
    baseURL: `${baseUrl}/repos/${org}/${repo}`,
    ...(token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {}),
  });
};

export const github = async ({
  baseUrl = 'https://api.github.com',
  ...rest
}: GithubRepository): Promise<LanguageDictionary | never> => {
  try {
    const axiosClient = getAxiosClient({ baseUrl, ...rest });

    const { data: repository } = await axiosClient.get('/contents');

    const directories = repository.data.filter((item) => item.type === 'dir');

    console.log(repository);
  } catch (e) {
    console.log(e.message);
  }

  // console.log(directories);

  const languageData = {};

  // for (const directory of directories) {
  //   const languageCode = directory.name;

  //   if (!languages[languageCode]) {
  //     continue;
  //   }

  //   languageData[languageCode] = {};

  //   for (const file of directory.files) {
  //     const { data: json } = await axios.get(file.url);

  //     languageData[languageCode][file.name] = json;
  //   }
  // }

  return languageData;
};
