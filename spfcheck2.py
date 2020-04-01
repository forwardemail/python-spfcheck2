#!/usr/bin/env python

import os
import spf
import sys

# override max lookup from 10 to 20
# https://github.com/sdgathman/pyspf/blob/abc534e65ba55a9b61f1f809448a444242b83cce/spf.py#L253
spf.MAX_LOOKUP = 20

def main():
    if len(sys.argv) != 4:
        print('[' + os.path.basename(__file__) + '] invalid number of arguments.')
        sys.exit(1)

    result, explanation = spf.check2(sys.argv[1], sys.argv[2], sys.argv[3])
    print(result + ',' + explanation)
    sys.exit(0)

if __name__ == '__main__':
    main()
