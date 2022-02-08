<template>
<div class="row">
  <div class="container emp-profile col-md-8">
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-img">
                            <img src="https://storage.googleapis.com/stateless-campfire-pictures/2019/05/e4629f8e-defaultuserimage-15579880664l8pc.jpg" alt=""/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="profile-head">
                                    <h5 class="tableletters">Name : {{result?.fullname}}</h5>
                                    <h6 class="buttons">Current Role : {{result?.position}}</h6>
                                    <h6 class="buttons">Current Status : {{result?.internStatus}}</h6>
                        </div>
                    </div>
                    <div v-if="result?.internStatus === 'ACTIVE'" class="col-md-6">
                        <input type="button" class="profile-edit-btn q-mb-md" name="btnAddMore" value="Add Review" @click="reviewDialogRef.openDialog(result) "/>

                    </div>
                </div>
                <div class="row">
                    <div class="col-md-8">
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>User Id </label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{currentIntern}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Name </label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{result?.fullname}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Email </label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{result?.email}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Date Of Birth </label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{moment(result?.dateOfBirth).format('MMMM Do YYYY')}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Supervisor Name</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{result?.supervisor.name}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>School </label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{result?.school}}</p>
                                            </div>
                                        </div>
                                         <div class="row">
                                            <div class="col-md-6">
                                                <label>Year</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{moment(result?.academicYear).format('MMMM YYYY')}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Hired At  </label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{moment(result?.hiredAt).format('MMMM Do YYYY')}}</p>
                                            </div>
                                        </div>
                                         <div class="row">
                                            <div class="col-md-6">
                                                <label>End Internship</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{moment(result?.endInternship).format('MMMM Do YYYY')}}</p>
                                            </div>
                                        </div>

                                        <div class="row cursor-pointer" @click="apot">
                                            <div class="col-md-6 cursor-pointer">
                                                <label class="cursor-pointer">Total Reviews</label>
                                            </div>
                                            <div class="col-md-6 cursor-pointer tooltip">
                                                <p >{{result?.reviews.length}}</p>
                                                <span class="tooltiptext">Show Intern's Reviews</span>
                                            </div>
                                        </div>
                            </div>
                        </div>
                    </div>
                </div>
                <span><a class="nav-link active" id="home-tab" data-toggle="tab" href="#" role="tab" aria-controls="home" aria-selected="true"></a></span>
        </div>
        <div v-if="showRevs" class="container emp-profile col-md-4" style="border: 2px dashed rgb(226, 91, 12)">
            <ReviewItem
                v-for="(review,index) in wholeReviews"
                :key="review.id"
                :review="review"
                :index="index"
                @refetchreviews="fetchIntern"
            />
            </div>
        </div>
           <ReviewDialog ref="reviewDialogRef" @refetchreviews="fetchIntern"/>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import moment from 'moment'

import { useFetchInternById } from 'src/hooks/useFetchInterns'

import ReviewDialog from '../components/ReviewDialog.vue'
import ReviewItem from '../components/ReviewItem.vue'

export default defineComponent({
  name: 'Intern',
  components: {
    ReviewDialog,
    ReviewItem
  },
  setup () {
    // sksks
    const router = useRoute()

    const currentIntern = router.params.id as string
    const reviewDialogRef = ref(null)

    const { result, fetchIntern } = useFetchInternById(currentIntern)
    const showRevs = ref(false)

    console.log('current intern is ', result)

    // const firsttry = result.value?.academicYear
    // console.log('result is ', result)
    // const res = () => {
    //   return result.value?.academicYear
    // }
    // console.log('res', res)

    // const year = computed(
    //   () => {
    //     console.log(firsttry)
    //     return new Date(firsttry as Date).toDateString()
    //   })
    // console.log('we made ', year.value)

    //   field: (row: Interview) => {
    //           const interview = rows.value.find((c) => c.id === row.id)
    //           const stime = new Date(interview?.startTime as Date)
    //           return stime.toDateString()
    //         }

    const apot = () => {
      showRevs.value = !showRevs.value
    //   console.log('CHECKING NOW', result.value)
    }

    const wholeReviews = computed(
      () => {
        const myReviews = result.value ? result.value.reviews : []
        return myReviews
      }
    )

    return {
      result,
      currentIntern,
      fetchIntern,
      reviewDialogRef,
      apot,
      showRevs,
      wholeReviews,
      moment
    }
  }

})
</script>

<style lang="scss" scoped>
body{
    background: -webkit-linear-gradient(left, #3931af, #00c6ff);
}
.emp-profile{
    padding: 3%;
    margin-top: 3%;
    margin-bottom: 3%;
    border-radius: 0.5rem;
    background: #fff;
}
.profile-img{
    text-align: center;
}
.profile-img img{
    width: 70%;
    height: 100%;
}
.profile-img .file {
    position: relative;
    overflow: hidden;
    margin-top: -20%;
    width: 70%;
    border: none;
    border-radius: 0;
    font-size: 15px;
    background: #212529b8;
}
.profile-img .file input {
    position: absolute;
    opacity: 0;
    right: 0;
    top: 0;
}
.profile-head h5{
    color: #333;
}
.profile-head h6{
    color: #0062cc;
}
.profile-edit-btn{
    border: none;
    border-radius: 1.5rem;
    width: 70%;
    padding: 2%;
    font-weight: 600;
    background-color: #00000036;
    color: #6c757d;
    cursor: pointer;
}

.proile-rating{
    font-size: 12px;
    color: #818182;
    margin-top: 5%;
}
.proile-rating span{
    color: #495057;
    font-size: 15px;
    font-weight: 600;
}
.profile-head .nav-tabs{
    margin-bottom:5%;
}
.profile-head .nav-tabs .nav-link{
    font-weight:600;
    border: none;
}
.profile-head .nav-tabs .nav-link.active{
    border: none;
    border-bottom:2px solid #0062cc;
}
.profile-work{
    padding: 14%;
    margin-top: -15%;
}
.profile-work p{
    font-size: 12px;
    color: #818182;
    font-weight: 600;
    margin-top: 10%;
}
.profile-work a{
    text-decoration: none;
    color: #495057;
    font-weight: 600;
    font-size: 14px;
}
.profile-work ul{
    list-style: none;
}
.profile-tab label{
    font-weight: 600;
}
.profile-tab p{
    font-weight: 600;
    color: #0062cc;
}

//button styles
span{
  position: relative;
  display: inline-flex;
  width: 180px;
  height: 55px;
  margin: 0 15px;
  perspective: 1000px;
}
span a{
  font-size: 19px;
  letter-spacing: 1px;
  transform-style: preserve-3d;
  transform: translateZ(-25px);
  transition: transform .25s;
  font-family: 'Montserrat', sans-serif;

}
span a:before,
span a:after{
  position: absolute;
  content: "HOME";
  height: 55px;
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid black;
  box-sizing: border-box;
  border-radius: 5px;
}
span a:before{
  color: #fff;
  background: #000;
  transform: rotateY(0deg) translateZ(25px);
}
span a:after{
  color: #000;
  transform: rotateX(90deg) translateZ(25px);
}
span a:hover{
  transform: translateZ(-25px) rotateX(-90deg);
}

//for hovering
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: rgb(226, 91, 12);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 1%;
  margin-left: -60px;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
