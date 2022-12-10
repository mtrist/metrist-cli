import axios from 'axios';
import { languages } from '../../constants/languages.constant';


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

export const getRepositoryData = async ({
  baseUrl = 'https://api.github.com',
  ...rest
}: GithubRepository) => {
  const axiosClient = getAxiosClient({ baseUrl, ...rest });
  const { data: repository } = await axiosClient.get('/contents');  

  const directories = repository.data.filter((item) => item.type === 'dir');

  // create an object to store the data for each language
  const languageData = {};

  // iterate over the repository's directories and get the language code and files in each language directory
  for (const directory of directories) {
    const languageCode = directory.name;

    const directoryFiles = await 

    if (!languages[languageCode]) continue;

    // create an inner object for each language to store the filenames and parsed JSON values
    languageData[languageCode] = {};
    

    // iterate over the files in the language directory and parse the JSON data
    for (const file of directory.files) {
      const { data: json } = await axios.get(file.url);

      languageData[languageCode][file.name] = json;
    }
  }

  return languageData;
};
