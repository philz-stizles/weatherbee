type FetchOptions = {
  url: string;
};

const fetcher = async ({ url }: FetchOptions) => {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export default fetcher;
