import axios from 'axios';
import { languages } from '../../constants/languages.constant';

const getContentsGetter = (user , repo)

export const getRepositoryData = async (url: string) => {
  const [, user, repo] =
    url.match(/https:\/\/github.com\/([^/]+)\/([^/]+)/) || [];

  // make an API call to GitHub to get the repository data
  const repository = await axios.get(
    `https://api.github.com/repos/${user}/${repo}/contents`,
  );

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
