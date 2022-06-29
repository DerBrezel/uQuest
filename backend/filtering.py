# this file contains the initial attempt at content based filtering
# the input for this program will be a quest dataset and a player profile
# the output will be the quest that matches best (or maybe a selection)


import pandas as pd

# create test preference profile
testpp = pd.Series({"Action": 0.2,
                "Erkundung": 0.4,
                "Social": 0.3})

# create test dataframe with example weights,
df = pd.DataFrame({"Action": [0.1, 0.4, 0.8],
                   "Erkundung": [0.5, 0.1, 0.2],
                   "Social": [0.1, 0.8, 0.3]})

print("\n Test preference profile: \n \n", testpp, "\n")



def cfilter(pp, df):     # input preference profile and data frame
    # calculate difference between each point in pp and df, sum up in value, sort by value
    df["diff"] = 0  # add new column for weights
    for index in range(df.shape[0]):    # iterate through rows
        x = range(len(pp))
        for i in x:                     # iterate through pp
            n = pp[i]                   # get individual pp value
            idiff = abs(df.iat[index, i] - n)   # calculate difference as absolute value
            df.at[index, "diff"] += idiff       # add to total difference
    result = df.sort_values(by=["diff"], ascending=True)  # sort by difference
    return result


print("Test Recommended Quests: \n \n", cfilter(testpp, df), "\n")


# read csv, the delimiter must be set to allow for commas in the columns
qdf = pd.read_csv("skyrim_db.csv", delimiter=";")
# get this from input:
playerClass = "warrior"

print("Imported csv: \n \n", qdf, "\n")

# slice relevant data
qdfs = qdf.iloc[:,7:]

# drop unnecessary equipment
if playerClass != "warrior":
    qdfs = qdfs.drop(["itemEqWarrior"], axis = 1)
if playerClass != "thief":
    qdfs = qdfs.drop(["itemEqThief"], axis = 1)
if playerClass != "mage":
    qdfs = qdfs.drop(["itemEqMage"], axis = 1)



print("Sliced: \n \n", qdfs, "\n")


# duration: length (.25, .5, .75, 1.0)
# item exp: level
# itemValue: loot/moneys
# class exclusive weights (Equipment)


pp = pd.Series({"timeInvest": 0.2,
                "expWant": 0.4,
                "moneyWant": 0.3,
                "equWant": 0.5})

print("\n Preference profile: \n \n", pp, "\n")

sorted = cfilter(pp, qdfs)

print("Recommended Quests: \n \n", sorted, "\n")

topidx = sorted.index.values[0] # top quest index
topq = qdf.iloc[topidx, :].tolist()
# when I try to slice the correct row, it turns some text into nan
print(topq)

#resultSeries = qdf.iloc[]


# send all other entries from the original dataframe at the top ID to the frontend