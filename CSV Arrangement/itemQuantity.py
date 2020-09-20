import csv
import re

sweetTotal = {}
sweetRate = {}
customerDet = {}
with open('test.csv') as file:
    reader = csv.DictReader(file)
    # print(list(reader)[0])
    distTotal = 0
    for i in reader:
        total = 0
        customerDet[i['Your Name']] = {}
        customerDet[i['Your Name']]['name'] = i['Your Name']
        customerDet[i['Your Name']]['Phone'] = i['Phone ']
        customerDet[i['Your Name']]['Address / Flat no'] = i['Address / Flat no']
        customerDet[i['Your Name']]['items'] = []
        for key in i:
            x = re.search(r'\[(.+)\(.*?([0-9]+).*\)\.*]', key)
            if (x and i[key]!=""):
                customerDet[i['Your Name']]['items'].append(x.group(1)+'--- '+i[key])
                temp = re.search(r'([0-9 /]+)', i[key])
                if (x.group(1) in sweetTotal) :
                    sweetTotal[x.group(1)] += eval(temp.group(1),{"__builtins__": {}}, {})
                else:
                    sweetTotal[x.group(1)] = eval(temp.group(1),{"__builtins__": {}}, {})
                if (x.group(1) not in sweetRate):
                    sweetRate[x.group(1)] = x.group(2)
                total += int(x.group(2))* eval(temp.group(1),{"__builtins__": {}}, {})
        distTotal += total
        customerDet[i['Your Name']]['total'] = '₹'+str(total)
        

    print(sweetTotal)
    print(sweetRate)
    print(customerDet)

with open('ForSupplier.txt', 'w') as file:
    file.write('This Week\'s Orders (in Kgs / Packs where Applicable ) \n\n\n'+'---------------------------------------------'*2+'\n')
    for key, value in sweetTotal.items():
        file.write(key + '  :  ' + str(value)+'\n------------------------------\n')

with open('ForDistributor.txt', 'w') as file:
    for items in customerDet:
        for key, value in customerDet[items].items():
            file.write(key + '  :  ' + str(value)+'\n')
        file.write('\n--------------------------- CUT HERE ------------------------------\n')
    file.write('Total Amt. to be collected : '+ str(distTotal))
        
