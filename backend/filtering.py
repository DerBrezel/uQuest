# this file contains the initial attempt at content based filtering
# the input for this program will be a quest dataset and a player profile
# the output will be the quest that matches best (or maybe a selection)


import pandas as pd


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





def slice(df, playerclass):  # slice the df according to class
    dfs = df.iloc[:, 7:]  # slice relevant data
    # drop unnecessary equipment
    if playerclass != "warrior":
        dfs = dfs.drop(["itemEqWarrior"], axis=1)
    if playerclass != "thief":
        dfs = dfs.drop(["itemEqThief"], axis=1)
    if playerclass != "mage":
        dfs = dfs.drop(["itemEqMage"], axis=1)
    return dfs  # return original df and sliced and prepped dfs

print("Recommended Quests: \n \n", sorted, "\n")

# trial preference profile
testpp = pd.Series({"timeInvest": 0.2,
                "expWant": 0.4,
                "moneyWant": 0.3,
                "equWant": 0.5})

# get this from input:
playerclass = "mage"

print("\n Preference profile: \n \n", testpp, "\n \n Class:", playerclass, "\n")

def filter(csvname, playerclass, pp):
    # read csv, the delimiter must be set to allow for commas in the columns
    df = pd.read_csv(csvname, delimiter=";")
    dfs = slice(df, playerclass)  # slice data
    sorted = cfilter(pp, dfs)  # sort by best match
    topidx = sorted.index.values[0]  # find top quest index
    topq = df.iloc[topidx, :].tolist()  # make into list
    return topq


def filterprint(csvname, playerclass, pp):
    # read csv, the delimiter must be set to allow for commas in the columns
    df = pd.read_csv("skyrim_db.csv", delimiter=";")
    print("Imported csv: \n \n", df, "\n")
    dfs = slice(df, playerclass)
    print("Sliced: \n \n", dfs, "\n")
    sorted = cfilter(pp, dfs)
    print("Recommended Quests: \n \n", sorted, "\n")
    topidx = sorted.index.values[0]  # find top quest index
    topq = df.iloc[topidx, :].tolist()  # make into list
    print(topq)
    return topq

filterprint("skyrim_db.csv", playerclass, testpp)