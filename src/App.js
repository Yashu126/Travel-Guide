import './App.css'

import {Component} from 'react'

import Loader from 'react-loader-spinner'

// Replace your code here
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class App extends Component {
  state = {apiStatus: apiStatusConstants.initial, travelList: []}

  componentDidMount() {
    this.getTravelData()
  }

  getTravelData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const response = await fetch('https://apis.ccbp.in/tg/packages')
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.packages.map(each => ({
        id: each.id,
        name: each.name,
        description: each.description,
        imgUrl: each.image_url,
      }))
      this.setState({
        travelList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderLoading = () => (
    <div className="loader" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccess = () => {
    const {travelList} = this.state
    return (
      <ul>
        {travelList.map(each => (
          <li key={each.id}>
            <img src={each.imgUrl} alt={each.name} />
            <div className="head-description">
              <h1>{each.name}</h1>
              <p>{each.description}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  renderpage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="background-con">
        <h1 className="heading">Travel Guide</h1>
        {this.renderpage()}
      </div>
    )
  }
}

export default App
