#!/usr/bin/env python

import os
import spf
import sys

def main():
    if len(sys.argv) != 4:
        print('[' + os.path.basename(__file__) + '] invalid number of arguments.')
        sys.exit(1)

    result, explanation = spf.check2(unicode(sys.argv[1]), sys.argv[2], sys.argv[3])
    print(result + ',' + explanation)
    sys.exit(0)

if __name__ == '__main__':
    main()
