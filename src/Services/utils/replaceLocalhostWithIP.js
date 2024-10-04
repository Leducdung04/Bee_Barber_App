import {IPV4} from "@env"
export function replaceLocalhostWithIP(url) {
 
    if (url.includes('localhost')) {
      return url.replace('localhost', IPV4);
    }
    return url; 
  }