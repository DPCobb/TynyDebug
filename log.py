import sys, json

def read_in():
    data = sys.stdin.readlines()
    return json.loads(data[0])
#log the data
def log(data):
    msg = 'This is ' + data[0] + ' and it is ' + data[1]
    f = open("logs/testlog.txt", "a+")
    f.write(msg + '\n')
    print 'log'

def main():
    # gets data array
    dataIn = read_in()
    print dataIn[0]
    print 'test python'
    log(dataIn)


# Start the logger
if __name__ == '__main__':
    main()
