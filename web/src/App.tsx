import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Home from '@/pages/Home'

import { MyClasses } from '@/pages/teacher/MyClasses'
import { ClassDetail } from '@/pages/teacher/ClassDetail'
import { StudentProfile } from '@/pages/teacher/StudentProfile'
import { AttemptDetail as TeacherAttemptDetail } from '@/pages/teacher/AttemptDetail'
import { LiveSessions } from '@/pages/teacher/LiveSessions'
import { LiveSessionView } from '@/pages/teacher/LiveSessionView'
import { LessonPreview } from '@/pages/teacher/LessonPreview'
import { EditAssignment } from '@/pages/teacher/EditAssignment'
import { QuestionBank } from '@/pages/teacher/QuestionBank'

import { Users } from '@/pages/admin/Users'
import { Classes } from '@/pages/admin/Classes'
import { AuditLog } from '@/pages/admin/AuditLog'
import { Headsets } from '@/pages/admin/Headsets'
import { HeadsetEdit } from '@/pages/admin/HeadsetEdit'
import { Settings } from '@/pages/admin/Settings'
import { UserEdit } from '@/pages/admin/UserEdit'
import { ClassEdit } from '@/pages/admin/ClassEdit'

import SignIn from '@/pages/student/SignIn'
import CourseMenu from '@/pages/student/CourseMenu'
import GuidedTour from '@/pages/student/GuidedTour'
import Identification from '@/pages/student/Identification'
import StartupProcedure from '@/pages/student/StartupProcedure'
import Repair from '@/pages/student/Repair'
import FinalQuiz from '@/pages/student/FinalQuiz'
import MyResults from '@/pages/student/MyResults'
import AttemptDetail from '@/pages/student/AttemptDetail'
import FinalQuizDetail from '@/pages/student/FinalQuizDetail'
import Catalog from '@/pages/student/Catalog'
import ExplodedView from '@/pages/student/ExplodedView'

import PlatformOverview from '@/pages/platform/Overview'
import Establishments from '@/pages/platform/Establishments'
import NewEstablishment from '@/pages/platform/NewEstablishment'
import EstablishmentDetail from '@/pages/platform/EstablishmentDetail'
import Licenses from '@/pages/platform/Licenses'
import Usage from '@/pages/platform/Usage'
import PlatformAudit from '@/pages/platform/Audit'

import VrOnboarding from '@/pages/vr/Onboarding'
import VrMenu from '@/pages/vr/Menu'
import VrGuidedTour from '@/pages/vr/GuidedTour'
import VrIdentification from '@/pages/vr/Identification'
import VrStartup from '@/pages/vr/Startup'
import VrRepair from '@/pages/vr/Repair'
import VrFinalQuiz from '@/pages/vr/FinalQuiz'
import VrExplodedView from '@/pages/vr/ExplodedView'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Teacher */}
        <Route path="/teacher" element={<MyClasses />} />
        <Route path="/teacher/classes/:id" element={<ClassDetail />} />
        <Route path="/teacher/students/:studentId" element={<StudentProfile />} />
        <Route path="/teacher/attempts/:attemptId" element={<TeacherAttemptDetail />} />
        <Route path="/teacher/live" element={<LiveSessions />} />
        <Route path="/teacher/live/:studentId" element={<LiveSessionView />} />
        <Route path="/teacher/preview" element={<LessonPreview />} />
        <Route path="/teacher/preview/exploded" element={<ExplodedView />} />
        <Route path="/teacher/assignments/:id/edit" element={<EditAssignment />} />
        <Route path="/teacher/question-bank" element={<QuestionBank />} />

        {/* Establishment admin */}
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/users/:id/edit" element={<UserEdit />} />
        <Route path="/admin/classes" element={<Classes />} />
        <Route path="/admin/classes/:id/edit" element={<ClassEdit />} />
        <Route path="/admin/audit" element={<AuditLog />} />
        <Route path="/admin/headsets" element={<Headsets />} />
        <Route path="/admin/headsets/:id" element={<HeadsetEdit />} />
        <Route path="/admin/settings" element={<Settings />} />

        {/* Student web */}
        <Route path="/student/sign-in" element={<SignIn />} />
        <Route path="/student" element={<CourseMenu />} />
        <Route path="/student/guided-tour" element={<GuidedTour />} />
        <Route path="/student/identification" element={<Identification />} />
        <Route path="/student/startup" element={<StartupProcedure />} />
        <Route path="/student/repair" element={<Repair />} />
        <Route path="/student/final-quiz" element={<FinalQuiz />} />
        <Route path="/student/results" element={<MyResults />} />
        <Route path="/student/results/final-quiz" element={<FinalQuizDetail />} />
        <Route path="/student/attempt/:id" element={<AttemptDetail />} />
        <Route path="/student/catalog" element={<Catalog />} />
        <Route path="/student/exploded" element={<ExplodedView />} />

        {/* Platform */}
        <Route path="/platform" element={<PlatformOverview />} />
        <Route path="/platform/establishments" element={<Establishments />} />
        <Route path="/platform/establishments/new" element={<NewEstablishment />} />
        <Route path="/platform/establishments/:id" element={<EstablishmentDetail />} />
        <Route path="/platform/licenses" element={<Licenses />} />
        <Route path="/platform/usage" element={<Usage />} />
        <Route path="/platform/audit" element={<PlatformAudit />} />

        {/* VR */}
        <Route path="/vr" element={<VrOnboarding />} />
        <Route path="/vr/menu" element={<VrMenu />} />
        <Route path="/vr/guided-tour" element={<VrGuidedTour />} />
        <Route path="/vr/identification" element={<VrIdentification />} />
        <Route path="/vr/startup" element={<VrStartup />} />
        <Route path="/vr/repair" element={<VrRepair />} />
        <Route path="/vr/final-quiz" element={<VrFinalQuiz />} />
        <Route path="/vr/exploded" element={<VrExplodedView />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
