erajs.merge(erajs.framework.LogicWarpper, {

    comboDataNodes : parent.rdp.dictDataNodes,
    getSpecialDicts : function(pkey){
        var self = this,
            record = null,
            dictDatas = erajs.framework.LogicWarpper.comboDataNodes;
        erajs.Object.each(dictDatas,function(key,values){
            if(key == pkey){
                record = values;
                return false;
            }
        });
        return record;
    },

    transformDataGridData : function(response,keyMap){
        var self = this,
            tempDicts = {},
            tempArr=[];
        if(!erajs.isEmpty(keyMap)){
            erajs.Object.each(keyMap,function(key,value){
                tempArr.push(key);
                tempDicts[value] = self.getSpecialDicts(value);
            });
            erajs.Object.each(tempArr,function(key1,value1){
                erajs.Object.each(response.data.result.datals,function(key,value){
                    if(value[value1]!=null){
                        var dataKey=keyMap[value1];
                        erajs.Object.each(tempDicts[dataKey],function(key2,value2){
                            if(value[value1]==value2.key){
                                var text=value1+'Name';
                                value[text]=value2.value
                            }
                        })
                    }

                });
            });

        }
        return response;
    }
});
