const initialState = {
    records: [],
    checks: []
};

const operation = (state = initialState, action) => {
    console.log("REDUCER:::CALLED", action);
  
    switch (action.type) {
      case "ADD_RECORD":
          //console.log("STATE",state.records);
          //console.log("ACTION",action.data);
        return {
          ...state,
          records: [...state.records, ...action.data]
        };

      //case "DELETE_RECORDS":

      case "DELETE":
        //console.log("STATE",state.checks);
        //console.log("ACTION",action.data);
        const arrChecks = state.checks.filter(item => item.doc_id !== action.data.doc_id);
        const arrRecords = state.records.filter(item => item.doc_id !== action.data.doc_id);
        return{
          ...state,
          checks: [...arrChecks],
          records: [...arrRecords]
        };

      case "DELETE_MORE":
        console.log("STATE",state.checks);
        console.log("ACTION",action.data);
        var inArr = state.checks.map((val) => val.doc_id);
        //console.log("r",inArr);
        var inArr= state.checks.map((val) => val.doc_id);
        var array= state.records.filter((item)=> !(inArr.includes(item.doc_id)))
        return{
          ...state,
          checks: [],
          records: [...array]
        };

      case "ADD_CHECKED":
        // console.log("STATE",state.checks);
        // console.log("ACTION",action.data);
        const initLength= state.checks.length;
        const arr = state.checks.filter(item => item.doc_id !== action.data.doc_id);
        const finalLength= arr.length;
        if(initLength!==finalLength)
        {
            return {
                ...state,
                checks: [...arr]
            };   
        }
        else
        {
            return {
                ...state,
                checks: [...state.checks, action.data]
            };
        }
        
      
        
        default:
      return state;
  }
};

export default operation;