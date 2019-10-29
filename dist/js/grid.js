var DepositCol = [
  { headerName: "번호", field: "No" },
  { headerName: "구분", field: "Type" },
  {
    headerName: "이율", field: "Interest",
    cellRenderer: function (params) {
      return numeral(params.data.Interest).format('0.00%');
    }
  },
  { headerName: "은행", field: "Bank" },
  { headerName: "상품명", field: "Description" },

  {
    headerName: "잔액", field: "Balance",
    cellRenderer: function (params) {
      return numeral(params.data.Balance).format('0,0') + ' 원';
    }
  },
  {
    headerName: "연 수익", field: "Year_Interest",
    cellRenderer: function (params) {
      var result = 0;
      switch (params.data.Type) {
        case '예금':
        case 'CMA':
          result = params.data.Balance * params.data.Interest * 0.846;
          break;
        case '적금':
          var resultValue = 0;
          for (var i = 1; i <= 12; i++) {
            resultValue += params.data.InstallmentPrice * params.data.Interest * 0.846 * i / 12;
          }
          result = resultValue;
          break;
      }
      return numeral(result).format('0,0') + ' 원';
    }
  },
  {
    headerName: "월 수익", field: "Month_Interest",
    cellRenderer: function (params) {
      var result = 0;
      switch (params.data.Type) {
        case '예금':
        case 'CMA':
          result = params.data.Balance * params.data.Interest * 0.846;
          break;
        case '적금':
          var resultValue = 0;
          for (var i = 1; i <= 12; i++) {
            resultValue += params.data.InstallmentPrice * params.data.Interest * 0.846 * i / 12;
          }
          result = resultValue;
          break;
      }
      return numeral(result / 12).format('0,0') + ' 원';
    }
  },
];
var DepositGridOptions = {
  columnDefs: DepositCol,
  enableRangeSelection: true,
  defaultColDef: {
    resizable: true,
    sortable: true,
    filter: true,
    filterParams: {
      selectAllOnMiniFilter: true,
      newRowsAction: 'keep',
      clearButton: true
    },
  },
  rowDragManaged: true,
};
new agGrid.Grid(DepositGrid, DepositGridOptions);

function GetValueTotalAfterCellRenderer(gridOptions, col) {
  var cellRenderer = gridOptions.api.getColumnDef(col).cellRenderer;
  var result = 0;
  gridOptions.api.forEachNode(function (node, index) {
    result += numeral(cellRenderer(node))._value;
  });
  return numeral(result).format(0, 0);
}

$(document).ready(function(){
  $.getJSON('json/seungwoopaek.json')
    .done(function(res){
      DepositGridOptions.api.setRowData(res);
      
      Total_Balance.innerHTML = GetValueTotalAfterCellRenderer(DepositGridOptions, 'Balance') + ' 원';
      Total_Year_Interest.innerHTML = GetValueTotalAfterCellRenderer(DepositGridOptions, 'Year_Interest') + ' 원';
      Total_Month_Interest.innerHTML = GetValueTotalAfterCellRenderer(DepositGridOptions, 'Month_Interest') + ' 원';      
    })
    .fail(function(err){
      console.error(err);
    });
});

