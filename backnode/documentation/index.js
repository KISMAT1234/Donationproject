import basicinfo from './basicinfo';
import servers from './servers';
import tags from './tags';
import components from './components';
import path from './path';

const config = {
  ...basicinfo,
  ...servers,
  ...tags,
  ...components,
  ...path,
};

export default config;
