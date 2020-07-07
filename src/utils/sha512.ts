/**
 * Identicon.js 2.3.1
 * http://github.com/stewartlord/identicon.js
 *
 * PNGLib required for PNG output
 * http://www.xarg.org/download/pnglib.js
 *
 * Copyright 2017, Stewart Lord
 * Released under the BSD license
 * http://www.opensource.org/licenses/bsd-license.php
 */

import jsSHA from 'jssha'

const salt = '0' // Salt is there to get same default implementation as http://identicon.net/

export const generateSha512 = (data: string): string => {
  const shaObj = new jsSHA('SHA-512', 'TEXT')
  shaObj.update(data + salt)
  return shaObj.getHash('HEX')
}
