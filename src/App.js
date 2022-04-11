import './css/new.css';
import { Component } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import LoginForm from './LoginForm';
import axios from 'axios';
class App extends Component {
	render() {
		return (
			<div>
				<Header />
				<Routes>
					<Route path='/' element={<LoginForm />} />
					<Route path='/floatPopulationList' element={<FloatingPopulationList />} />
				</Routes>
				<Footer />
				{/* <img src={require('./beach.jpeg')} alt='' /> */}
				<br />
				{/* <img src={require('./beach.jpeg').default} alt='' /> */}
			</div>
		);
	}
}
class FloatingPopulationList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			append_FPList: undefined,
		};
	}
	f1 = () => {
		axios
			.get('http://3.35.120.155:5000/users', {})
			.then((res) => {
				//console.log(res);
				console.log(res.data);
				let jsonData = JSON.stringify(res.data);
				jsonData = jsonData.replace(/\(1시간단위\)/g, ''); //(1시간단위) -> 삭제
				jsonData = jsonData.replace(/\(10세단위\)/g, ''); //(10세단위) -> 삭제
				let json = JSON.parse(jsonData);
				//console.log(json);
				//console.log(json.entry); //엔트리 안에 객체가 전부 들어있다.
				//console.log(json.count);
				console.log(json.entry.length);
				let result = [];
				for (let i = 0; i < 30; i++) {
					let data = json.entry[i];
					console.log(data); // {일자: "20191101", 시간: "00", 연령대: "40", 성별: "여성", 시: "서울", …}
					console.log(typeof data); //object
					let idx = i + 1;
					result.push(
						<tr key={idx} className='hidden_type'>
							<td>{idx}</td>
							<td>{data.일자}</td>
							<td>{data.시간}</td>
							<td>{data.연령대}</td>
							<td>{data.성별}</td>
							<td>{data.시}</td>
							<td>{data.군구}</td>
							<td>{data.유동인구수}</td>
						</tr>
					);
				} // end for
				this.setState({ append_FPList: result });
			})
			.catch(() => {
				alert('Error');
			});
	};
	render() {
		return (
			<>
				<button onClick={this.f1}>버튼 </button>
				<section className='sub_wrap'>
					<article className='s_cnt mp_pro_li ct1 mp_pro_li_admin'>
						<div className='li_top'>
							<h2 className='s_tit1'>서울시 유동인구 데이터 - 19년 11월</h2>
						</div>
						<div className='list_cont list_cont_admin'>
							<table className='table_ty1 fp_tlist'>
								<thead>
									<tr>
										<th>Row</th>
										<th>일자</th>
										<th>시간</th>
										<th>연령대</th>
										<th>성별</th>
										<th>시</th>
										<th>군구</th>
										<th>유동인구수</th>
									</tr>
								</thead>
							</table>
							<table className='table_ty2 fp_tlist'>
								<tbody>
									{this.state.append_FPList}
									{/* 읽어온 데이터가 들어갈 곳 */}
								</tbody>
							</table>
						</div>
					</article>
				</section>
			</>
		);
	}
}
export default App;
