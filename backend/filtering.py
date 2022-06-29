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


# get this from input:
playerClass = "warrior"

# read csv, the delimiter must be set to allow for commas in the columns
df = pd.read_csv("skyrim_db.csv", delimiter=";")
print("Imported csv: \n \n", df, "\n")


def slice(df, playerClass):  # slice the df according to class
    dfs = df.iloc[:, 7:]  # slice relevant data
    # drop unnecessary equipment
    if playerClass != "warrior":
        dfs = dfs.drop(["itemEqWarrior"], axis=1)
    if playerClass != "thief":
        dfs = dfs.drop(["itemEqThief"], axis=1)
    if playerClass != "mage":
        dfs = dfs.drop(["itemEqMage"], axis=1)
    print("Sliced: \n \n", dfs, "\n")
    return dfs  # return original df and sliced and prepped dfs


dfs = slice(df, playerClass)

# trial preference profile
pp = pd.Series({"timeInvest": 0.2,
                "expWant": 0.4,
                "moneyWant": 0.3,
                "equWant": 0.5})
print("\n Preference profile: \n \n", pp, "\n")

sorted = cfilter(pp, dfs)
print("Recommended Quests: \n \n", sorted, "\n")

topidx = sorted.index.values[0] # top quest index
topq = df.iloc[topidx, :].tolist()

print(topq)

# send all other entries from the original dataframe at the top ID to the frontend
