var React=require('react');
var rows=[];

var WeatherApp=React.createClass(
  {
    getInitialState: function() {
      return {getdata: [],searchedCity:''};
    },

    WeatherData:function()
    {
      $.ajax({
        url:'http://api.openweathermap.org/data/2.5/weather?q='+this.state.searchedCity+'&appid=d451da26ae3bede906abe7950a91d0bd',
        dataType: 'json',
        type: 'POST',
        success: function(data)
        {
          //this.setState({getdata:data});
          console.log(data);
          $.ajax({
            url: 'http://localhost:8085/data',
            dataType: 'json',
            type: 'POST',
            data:{temp:data.main.temp,pressure:data.main.pressure ,humidity:data.main.humidity,temp_min:data.main.temp_min,temp_max:data.main.temp_max },
            success: function(data)
             {
                rows.push(
                  <tr><td>Tempreature</td><td>{data.temp}</td></tr>,
                  <tr><td>Pressure</td><td>{data.pressure}</td></tr>,
                  <tr><td>Humidity</td><td>{data.humidity}</td></tr>,
                  <tr><td>Minimum Tempreature</td><td>{data.temp_min}</td></tr>,
                  <tr><td>Maximum Tempreature</td><td>{data.temp_max}</td></tr>);
              this.setState({data:data});
              console.log(data);
            }.bind(this),
            error: function (xhr, status, err) {
              console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

  },
  handleSubmit:function(e) {
    this.setState({searchedCity:e.target.value});
  },
  render: function() {
    return(
      <div class="contentdata">
      <input type="text" onChange={this.handleSubmit} id="serachbar" />
      <button className="btn btn-default" onClick={this.WeatherData}>
      Add
      </button>
      <table className="table table-bordered table-inverse">
           <tbody> Weather Details{rows}</tbody>
           </table>
      </div>
    );
  }
});
module.exports=WeatherApp;
