import { create, env } from 'sanctuary';

const S = create({
  checkTypes: !BUILD,
  env
});

export default S;
