var PhotoSchema = new Schema({
  title: String,
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  },
  image: String,
  releaseDate: String,
  characters: [CharacterSchema]
});