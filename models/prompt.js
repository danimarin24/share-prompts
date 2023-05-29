import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  prompt: {
    type: String,
    requiered: [true, 'Prompt is required.'],
  },
  tag: {
    type: String,
    requiered: [true, 'Tag is required.'],
  },
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;
