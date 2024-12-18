type Music = {
  id?: string; // reserved for firestore id
  title: string;
  artist: string;
  duration: number;
  genre: string;
};

export default Music;
