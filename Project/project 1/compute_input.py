import sys, json, numpy as np,pandas as pd

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

def main():
    #get our data as an array from read_in()
    lines = read_in()

    #create a numpy array
    np_lines = np.array(lines)

    #use numpys sum method to find sum of all elements in the array
    lines_sum = np.sum(np_lines)
    cars = pd.read_csv("cars.csv")
    mpg = cars['mpg']
    s = mpg.max()   

    #return the sum to the output stream
    print(s)

#start process
if __name__ == '__main__':
    main()